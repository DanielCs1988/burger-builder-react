import * as React from 'react';

const loadLazily = (importComponent: Function) => {
    return class extends React.Component {
        state = {
            component: null
        };

        async componentWillMount() {
            const component = await importComponent();
            this.setState({ component: component.default });
        }

        render() {
            const { component: Component } = this.state;
            // @ts-ignore
            return Component ? <Component { ...this.props } /> : null;
        }
    };
};

export default loadLazily;