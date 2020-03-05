import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavItems from './NavigationItems';
import NavItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavItems />);
  });

  it('should render 2 NavItems if not authenticated', () => {    
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });

  it('should render 3 NavItems if authenticated', () => {    
    wrapper.setProps({isAuth: true});
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });

  it('should render log out NavItem if authenticated', () => {    
    wrapper.setProps({isAuth: true});
    expect(wrapper.contains(<NavItem link="/logout">Log out</NavItem>)).toEqual(true);
  });

});