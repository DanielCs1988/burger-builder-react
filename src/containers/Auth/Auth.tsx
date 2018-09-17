import { connect } from "react-redux";
import Auth from "../../components/Auth/Auth";
import {FormValueMap} from "../../components/UI/Form/form.types";

const mapDispatchToProps = (dispatch: any) => ({
    login: (credentials: FormValueMap) => console.log(credentials)
});

export default connect(
    null,
    mapDispatchToProps
)(Auth);