import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import Toolbar from "./Toolbar";
import Logo from "../../UI/Logo/Logo";
import Toggle from "../Toggle/Toggle";
import NavigationItems from "../NavigationItems/NavigationItems";

configure({ adapter: new Adapter() });

describe('<Toolbar />', () => {

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<Toolbar toggle={() => {}} />);
    });

    it('should render a <Logo /> component', () => {
        expect(wrapper.find(Logo)).toHaveLength(1);
    });

    it('should render a <Toggle /> component', () => {
        expect(wrapper.find(Toggle)).toHaveLength(1);
    });

    it('should render a <NavigationItems /> component', () => {
        expect(wrapper.find(NavigationItems)).toHaveLength(1);
    });
});