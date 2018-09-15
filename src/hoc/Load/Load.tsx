import * as React from 'react';
import Spinner from "../../components/UI/Spinner/Spinner";

const Load = ({ loading, children }: Props) => (
    <React.Fragment>
        { loading ? <Spinner /> : children }
    </React.Fragment>
);

export interface Props {
    loading: boolean;
    children?: JSX.Element | JSX.Element[]
}

export default Load;