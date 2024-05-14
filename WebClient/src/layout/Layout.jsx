import Header from "../temp/components/Header/Header";
import Footer from "../temp/components/Footer/Footer";
import Routers from "../routes/Routers";


const Layout = () => {

    return (
        <>
            <Header />
            <main>
                <Routers />
            </main>
            <Footer />
        </>
    )
}

export default Layout;