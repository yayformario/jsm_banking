import HeaderBox from '@/components/ui/HeaderBox'
import RecentTransactions from '@/components/ui/RecentTransactions';
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async({searchParams: {id, page } }: SearchParamProps) => {
    //Page counter
    const currentPage = Number(page as string) || 1;
    
    //Wait for a user to log in and fetch their accounts
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts ({ 
        userId: loggedIn.$id
    })
    if(!accounts) return;

    
    //Variables for accounts
    const accountsData = accounts?.data;

    //fetching account information
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
    const account = await getAccount ({appwriteItemId})

    //Console logging to verify data
    console.log({
        accountsData,
        account
    })

    return (
        <section className="home">
            
            <div className="home-content">

                <header className="home-header">
                   <HeaderBox
                   type="greeting"
                   title="Welcome"
                   user={loggedIn?.firstName || 'Guest'}
                   subtext="Access and manage your accounts or transactions"
                   />

                   <TotalBalanceBox 
                   accounts={accountsData}
                   totalBanks={accounts?.totalBanks}
                   totalCurrentBalance = {accounts?.totalCurrentBalance}
                   />

                </header>

                <RecentTransactions
                    accounts = {accountsData}
                    transactions = {account?.transactions}
                    appwriteItemId={appwriteItemId}
                    page = {currentPage}
                />
            </div>

            <RightSidebar
                user={loggedIn}
                transactions = {accounts?.transactions}
                banks= {accountsData?.slice(0,2)}
            />
        
        </section>
    )
}

export default Home