import * as React from 'react';
import Modal from "../../components/UI/Modal/Modal";
import {AxiosInstance} from "axios";

const withErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {
    return class extends React.Component<object, State> {
        state = {
            error: null,
            reqInterceptor: -1,
            resInterceptor: -1
        };

        componentWillMount() {
            this.state.reqInterceptor = axios.interceptors.response.use(
                res => res,
                    error => this.setState({ error })
            );
            this.state.resInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.state.reqInterceptor);
            axios.interceptors.response.eject(this.state.resInterceptor);
        }

        dismiss = () => {
            this.setState({ error: null });
        };

        render() {
            const errorMessage = this.state.error ? <p>{(this.state.error as any).message}</p> : null;
            return (
                <React.Fragment>
                    <Modal show={this.state.error !== null} closed={this.dismiss}>
                        {errorMessage}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
};

export interface State {
    error: any;
    reqInterceptor: number;
    resInterceptor: number;
}

export default withErrorHandler;