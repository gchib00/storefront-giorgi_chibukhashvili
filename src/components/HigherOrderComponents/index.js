/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */

// react-router-dom v6 stopped supporting 'withRouter and 'withNavigation',
// so we need to create a custom HOC in order to access params in class components
import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <WrappedComponent
      {...props}
      params={params}
      navigate={navigate}
      location={location}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  );
};
export default withRouter;
