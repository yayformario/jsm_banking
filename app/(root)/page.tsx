import HeaderBox from '@/components/ui/HeaderBox'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';

const Home = () => {
    const loggedIn = {FirstName: 'Mario' };

    return (
        <section className="home">
            
            <div className="home-content">

                <header className="home-header">
                   <HeaderBox
                   type="greeting"
                   title="Welcome"
                   user={loggedIn?.FirstName || 'Guest'}
                   subtext="Access and manage your accounts or transactions"
                   />

                   <TotalBalanceBox 
                   accounts={[]}
                   totalBanks={1}
                   totalCurrentBalance = {1250.35}
                   />

                </header>

            </div>
        
        </section>
    )
}

export default Home