import Login from '../components/Dashboard/Login';
import DataEntry from '../components/Dashboard/DataEntry';
import WalletConnect from '../components/Dashboard/WalletConnect';
// import LoginForm from '../components/Dashboard/LoginForm';

const Dashboard = () => {
  return (
    <>
        <Login />
        <DataEntry /> 
        {/* <LoginForm /> */}
        <WalletConnect />
                    
   
    </>
      
  )
}

export default Dashboard;