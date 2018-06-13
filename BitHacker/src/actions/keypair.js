import { API_ROOT } from '../consts';
import fetch from 'cross-fetch';
import { REQUEST_KEYPAIRS, RECEIVE_KEYPAIRS } from './actiontypes';
import { REQUEST_PAGEN_KEYPAIRS, RECEIVE_PAGEN_KEYPAIRS } from './actiontypes';

export const requestKeypairs = (number=1) => ({
  type: REQUEST_KEYPAIRS,
  number: number
})

export const receiveKeypairs = (json) => ({
  type: RECEIVE_KEYPAIRS,
  keypairs: json.key_pairs,
  number: json.number
})

export const fetchKeypair = (number=1) => (dispatch, getState) => {
  dispatch(requestKeypairs(number))
  return fetch(API_ROOT + '/bit/num?number='+number)
    .then(response => response.json())
    .then(json => dispatch(receiveKeypairs(json)))
}

export const requestPageNKeypairs = (page=1) => ({
  type: REQUEST_PAGEN_KEYPAIRS,
  page: page
})

export const receivePageNKeypairs = (json) => ({
  type: RECEIVE_PAGEN_KEYPAIRS,
  page: json.page,
  keypairs: json.page_keypairs
})

export const fetchPageNKeypairs = (page=1) => (dispatch, getState) => {
  dispatch(requestPageNKeypairs(page))
  return fetch(API_ROOT + '/bit/multi?page='+page)
    .then(response => response.json())
    .then(json => dispatch(receivePageNKeypairs(json)))
}
