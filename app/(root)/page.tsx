import HeaderBox from '@/components/ui/HeaderBox'
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async() => {
    const loggedIn = await getLoggedInUser();

    return (
        <section className="home">
            
            <div className="home-content">

                <header className="home-header">
                   <HeaderBox
                   type="greeting"
                   title="Welcome"
                   user={loggedIn?.name || 'Guest'}
                   subtext="Access and manage your accounts or transactions"
                   />

                   <TotalBalanceBox 
                   accounts={[]}
                   totalBanks={1}
                   totalCurrentBalance = {1250.35}
                   />

                </header>

                RECENT TRANSACTIONS
            </div>

            <RightSidebar
                user={loggedIn}
                transactions = {[]}
                banks= {[{currentBalance: 10}, {currentBalance: 20}]}
            />
        
        </section>
    )
}

export default Home