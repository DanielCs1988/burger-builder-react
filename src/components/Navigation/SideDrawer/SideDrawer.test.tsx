import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import SideDrawer from "./SideDrawer";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

configure({ adapter: new Adapter() });

describe('<SideDrawer />', () => {

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<SideDrawer open={true} closed={() => {}} authenticated={false} />);
    });

    it('should render the backdrop when open', () => {
        const backdrop = wrapper.find(Backdrop);
        expect(backdrop.prop('show')).toBe(true);
    });

    it('should render a <Logo /> component', () => {
        expect(wrapper.find(Logo)).toHaveLength(1);
    });

    it('should render a <NavigationItems /> component', () => {
        expect(wrapper.find(NavigationItems)).toHaveLength(1);
    });

    it('should auth status to the <NavigationItems /> component', () => {
        expect(wrapper.find(NavigationItems).prop('authenticated')).toBe(false);
    });
});