/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */

// react-router-dom v6 stopped supporting 'withRouter and 'withNavigation',
// so we need to create a custom HOC in order to access params in class components
import { useParams, useNavigate } from 'react-router-dom';

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <WrappedComponent
      {...props}
      params={params}
      navigate={navigate}
    />
  );
};
export default withRouter;
