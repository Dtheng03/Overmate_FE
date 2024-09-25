import Intro from "@/components/homePage/Intro";
import Services from "@/components/homePage/Services";
import Why from "@/components/homePage/Why";

function HomePage() {
    return (
        <main className="bg-[url('./assets/imgs/background.png')] bg-contain bg-color1">
            <Intro />
            <Why />
            <Services />
        </main>
    );
}

export default HomePage;