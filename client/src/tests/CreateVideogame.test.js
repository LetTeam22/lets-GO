import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CreateVideogame from '../components/CreateVideogame';
import * as actions from '../redux/actions';

configure({ adapter: new Adapter() });

describe('<CreateVideogame/>', () => {

  const state = {genres: []};
  const mockStore = configureStore([thunk]);

  describe('Create videogame form', () => {

    let createVideogame;
    let store = mockStore(state);

    beforeEach(() => {
      createVideogame = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/create']}>
            <CreateVideogame />
          </MemoryRouter>
        </Provider>,
      );
    });

    it('Should render a form', () => {
        expect(createVideogame.find('form').length).toBe(1);
    });

    it('Should render a label for the name with the text "Name: "', () => {
      expect(createVideogame.find('label').at(0).text()).toEqual('Name: ');
    });
    
    it('Should render an input with property "name" equal to "name"', () => {
      expect(createVideogame.find('input[name="name"]').length).toBe(1);
    });
    
    it('Should render a label for the description with the text "Description: "', () => {
      expect(createVideogame.find('label').at(1).text()).toEqual('Description: ');
    });
    
    it('Should render a textarea with property "name" equal to "description"', () => {
      expect(createVideogame.find('textarea[name="description"]').length).toBe(1);
    });
    
    it('Should render a label for the image url with the text "Image URL: "', () => {
      expect(createVideogame.find('label').at(2).text()).toEqual('Image URL: ');
    });
    
    it('Should render an input with property "name" equal to "image"', () => {
      expect(createVideogame.find('input[name="image"]').length).toBe(1);
    });
    
    it('Should render a label for the released date with the text "Released date: "', () => {
      expect(createVideogame.find('label').at(3).text()).toEqual('Released date: ');
    });
    
    it('Should render an input with property "name" equal to "released"', () => {
      expect(createVideogame.find('input[name="released"]').length).toBe(1);
    });
    
    it('Should render a label for the rating with the text "Rating: "', () => {
      expect(createVideogame.find('label').at(4).text()).toEqual('Rating: ');
    });
    
    it('Should render an input with property "name" equal to "rating", type number, min 0, max 5 and step 0.1', () => {
      expect(createVideogame.find('input[name="rating"]').length).toBe(1);
      expect(createVideogame.find('input[type="number"]').length).toBe(1);
      expect(createVideogame.find('input[min="0"]').length).toBe(1);
      expect(createVideogame.find('input[max="5"]').length).toBe(1);
      expect(createVideogame.find('input[step="0.1"]').length).toBe(1);
    });
    
    it('Should render a select with property "name" equal to "genre"', () => {
      expect(createVideogame.find('select[name="genre"]').length).toBe(1);
    });

    it('Should render a select with property "name" equal to "platform"', () => {
      expect(createVideogame.find('select[name="platform"]').length).toBe(1);
    });
    
    it('Should render a button with property type submit and text "Create"', () => {
      expect(createVideogame.find('button[type="submit"]').length).toBe(1);
      expect(createVideogame.find('button[type="submit"]').text()).toBe('Create');
    });

  })

  describe('Local states use', () => {

    let useState, useStateSpy, createVideogame;
    let store = mockStore(state);

    beforeEach(() => {
       useState = jest.fn()
       useStateSpy = jest.spyOn(React, 'useState');
       useStateSpy.mockImplementation((initialState) => [
          initialState,
          useState
       ]);  

       createVideogame = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/create']}>
              <CreateVideogame />
            </MemoryRouter>
          </Provider>,
       );
    });
    
    it('Should initiate correctly the form values', () => {
      expect(useStateSpy).toHaveBeenCalledWith({
        name: '',
        description: '',
        image: '',
        released: '',
        rating: '',
        genres: [],
        platforms: ''
      });
    });
      
    it('Should recognize when the input "name" value changes', () => {
      
      createVideogame.find('input[name="name"]').simulate('change', {
        target: { name: 'name', value: 'Super Wario Bros' },
      });
      expect(useState).toHaveBeenCalledWith({
      name: 'Super Wario Bros',
      description: '',
      image: '',
      released: '',
      rating: '',
      genres: [],
      platforms: ''
      });
    
      createVideogame.find('input[name="name"]').simulate('change', {
        target: { name: 'name', value: 'Among them' },
      });
      expect(useState).toHaveBeenCalledWith({
      name: 'Among them',
      description: '',
      image: '',
      released: '',
      rating: '',
      genres: [],
      platforms: ''
      });

    });

    it('Should recognize when the input "description" value changes', () => {
      
      createVideogame.find('textarea[name="description"]').simulate('change', {
        target: { name: 'description', value: 'Multiplayer game' },
      });
      expect(useState).toHaveBeenCalledWith({
      name: '',
      description: 'Multiplayer game',
      image: '',
      released: '',
      rating: '',
      genres: [],
      platforms: ''
      });

      createVideogame.find('textarea[name="description"]').simulate('change', {
        target: { name: 'description', value: 'Single player game' },
      });
      expect(useState).toHaveBeenCalledWith({
      name: '',
      description: 'Single player game',
      image: '',
      released: '',
      rating: '',
      genres: [],
      platforms: ''
      });

    });

    it('Should recognize when the input "image" value changes', () => {
      
      createVideogame.find('input[name="image"]').simulate('change', {
          target: { name: 'image', value: 'https://image.png' },
        });
        expect(useState).toHaveBeenCalledWith({
        name: '',
        description: '',
        image: 'https://image.png',
        released: '',
        rating: '',
        genres: [],
        platforms: ''
        });
      
        createVideogame.find('input[name="image"]').simulate('change', {
          target: { name: 'image', value: 'https://image2.png' },
        });
        expect(useState).toHaveBeenCalledWith({
        name: '',
        description: '',
        image: 'https://image2.png',
        released: '',
        rating: '',
        genres: [],
        platforms: ''
        });

    });

    it('Should recognize when the input "released" value changes', () => {
      
      createVideogame.find('input[name="released"]').simulate('change', {
          target: { name: 'released', value: '1990-05-12' },
        });
        expect(useState).toHaveBeenCalledWith({
        name: '',
        description: '',
        image: '',
        released: '1990-05-12',
        rating: '',
        genres: [],
        platforms: ''
        });
      
        createVideogame.find('input[name="released"]').simulate('change', {
          target: { name: 'released', value: '2022-01-05' },
        });
        expect(useState).toHaveBeenCalledWith({
        name: '',
        description: '',
        image: '',
        released: '2022-01-05',
        rating: '',
        genres: [],
        platforms: ''
        });

    });

    it('Should recognize when the input "rating" value changes', () => {
      
      createVideogame.find('input[name="rating"]').simulate('change', {
          target: { name: 'rating', value: 5 },
        });
        expect(useState).toHaveBeenCalledWith({
        name: '',
        description: '',
        image: '',
        released: '',
        rating: 5,
        genres: [],
        platforms: ''
        });
      
        createVideogame.find('input[name="rating"]').simulate('change', {
          target: { name: 'rating', value: 3.4 },
        });
        expect(useState).toHaveBeenCalledWith({
        name: '',
        description: '',
        image: '',
        released: '',
        rating: 3.4,
        genres: [],
        platforms: ''
        });

    });

    it('Should recognize when the select "genre" value changes', () => {
      
      createVideogame.find('select[name="genre"]').simulate('change', {
          target: { name: 'genre', value: 'Action' },
        });
        expect(useState).toHaveBeenCalledWith({
        name: '',
        description: '',
        image: '',
        released: '',
        rating: '',
        genres: ['Action'],
        platforms: ''
        });
      
        createVideogame.find('select[name="genre"]').simulate('change', {
          target: { name: 'genre', value: 'Strategy' },
        });
        expect(useState).toHaveBeenCalledWith({
        name: '',
        description: '',
        image: '',
        released: '',
        rating: '',
        genres: ['Strategy'],
        platforms: ''
        });

    });

    it('Should recognize when the select "platform" value changes', () => {
      
      createVideogame.find('select[name="platform"]').simulate('change', {
          target: { name: 'platform', value: 'PC' },
        });
        expect(useState).toHaveBeenCalledWith({
        name: '',
        description: '',
        image: '',
        released: '',
        rating: '',
        genres: [],
        platforms: 'PC'
        });
      
        createVideogame.find('select[name="platform"]').simulate('change', {
          target: { name: 'platform', value: 'PlayStation' },
        });
        expect(useState).toHaveBeenCalledWith({
        name: '',
        description: '',
        image: '',
        released: '',
        rating: '',
        genres: [],
        platforms: 'PlayStation'
        });

    });

  })

  describe('Dispatch al store', () => {
    let useState, useStateSpy, createVideogame;
    let store = mockStore(state);

    beforeEach(() => {
       useState = jest.fn();
       useStateSpy = jest.spyOn(React, 'useState');
       useStateSpy.mockImplementation((initialState) => [
          initialState,
          useState,
       ]);
       store = mockStore(state, actions.postVideogame);
       store.clearActions();
       createVideogame = mount(
          <Provider store={store}>
             <MemoryRouter initialEntries={['/create']}>
                <CreateVideogame />
             </MemoryRouter>
          </Provider>,
       );
    });

    afterEach(() => jest.restoreAllMocks());

    it('Should not dispatch the action "postVideogame" if the necessary form data is blank or not valid', () => {
      const createVideogameFn = jest.spyOn(actions, 'postVideogame');
      createVideogame.find('form').simulate('submit');
       expect(createVideogameFn).not.toHaveBeenCalled();
    });

    it('Should avoid page refresh after submit with the use of the event "preventDefault"', () => {
       const event = { preventDefault: () => {} };
       jest.spyOn(event, 'preventDefault');
       createVideogame.find('form').simulate('submit', event);
       expect(event.preventDefault).toBeCalled();
    });
 });

})