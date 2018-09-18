import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import Layout from "./Layout";
import Toolbar from "../../Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Navigation/SideDrawer/SideDrawer";

configure({ adapter: new Adapter() });

describe('<Layout />', () => {

    const children = <div className="test">Super advanced UI</div>;
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<Layout children={children} isAuthenticated={true} />);
    });

    it('should render a <Toolbar /> component', () => {
        expect(wrapper.find(Toolbar)).toHaveLength(1);
    });

    it('should auth status to the <Toolbar /> component', () => {
        expect(wrapper.find(Toolbar).prop('authenticated')).toBe(true);
    });

    it('should render a <SideDrawer /> component', () => {
        expect(wrapper.find(SideDrawer)).toHaveLength(1);
    });

    it('should auth status to the <SideDrawer /> component', () => {
        expect(wrapper.find(SideDrawer).prop('authenticated')).toBe(true);
    });

    it('should initialize the <SideDrawer /> component as closed', () => {
        expect(wrapper.find(SideDrawer).prop('open')).toBe(false);
    });

    it('should render child components', () => {
        const main = wrapper.find('main');
        expect(main.containsMatchingElement(children)).toBe(true);
    });

    it('should open the <SideDrawer /> component when the toolbar toggle is clicked', () => {
        wrapper.find(Toolbar).prop('toggle').apply(null);
        expect(wrapper.find(SideDrawer).prop('open')).toBe(true);
    });

    it('should close the open <SideDrawer /> component when it is clicked', () => {
        wrapper.setState({ showSideDrawer: true });
        wrapper.find(SideDrawer).prop('closed').apply(null);
        expect(wrapper.find(SideDrawer).prop('open')).toBe(false);
    });
});