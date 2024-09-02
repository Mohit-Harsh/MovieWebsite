import * as React from 'react';
import { useAutocomplete } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../App';
import { useState } from 'react';

export default function AutocompleteSearch({Listbox,Input}) 
{

  const [mode,setMode,cards] = React.useContext(Context);

  let options = [];


  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: options,
    getOptionLabel: (option) => option['title'],
  });

  return (
    <div>
      <div {...getRootProps()}>
        <Input {...getInputProps()} id="search_bar"/>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()} >
          {groupedOptions.map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            return (
              <li key={key['id']} {...optionProps}>
                <Link to={`/movie/${option['title']}`} state={{'title':option['title'],'image':option['image'],'lang':['Telugu','Hindi','English'],'rating':13,'wideimg':option['image_wide']}}>
                  {option['title']}
                </Link>
              </li>
            );
          })}
        </Listbox>
      ) : null}
    </div>
  );
}
