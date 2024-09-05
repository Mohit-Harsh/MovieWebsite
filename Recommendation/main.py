from fastapi import FastAPI
from pydantic import BaseModel
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from typing import List

embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2",cache_folder="./allminilm")
vectorstore = FAISS.load_local("MovieVectorStore",index_name='movie_embeddings',embeddings=embedding_model,allow_dangerous_deserialization=True)

class Movie(BaseModel):

    mid:str
    title: str
    plot: str
    cast: str
    genre: str


app = FastAPI()


@app.post("/api/embeddings/create")
async def create_item(movie: Movie):

    embedding = embedding_model.embed_query(movie.title)+embedding_model.embed_query(movie.genre)+embedding_model.embed_query(movie.plot)+embedding_model.embed_query(movie.cast)

    vectorstore.delete(ids=[movie.mid])

    vectorstore.add_embeddings(text_embeddings=embedding,ids=movie.mid)

    vectorstore.save_local("MovieVectorStore",index_name='movie_embeddings')

    return movie

@app.post("/api/recommend")
async def get_item(visited: List[Movie]):

    recommendations = []

    for v in visited:

        title = embedding_model.embed_query(v.title);
        genre = embedding_model.embed_query(v.genre);
        plot = embedding_model.embed_query(v.plot);
        cast = embedding_model.embed_query(v.cast);

        embedding = title+genre+plot+cast

        r = [x.page_content for x in vectorstore.similarity_search_by_vector(embedding=embedding,k=3)[1:]]

        recommendations.extend(r)

    return recommendations