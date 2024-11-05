import Benefits from "@/components/bePartnerPage/Benefits";
import Section1 from "@/components/bePartnerPage/Section1";
import Section2 from "@/components/bePartnerPage/Section2";

function BePartner() {
    return (
        <main className="bg-[url('./assets/imgs/background.png')] bg-cover bg-color1">
            <Section1 />
            <Benefits />
            <Section2 />
        </main>
    );
}

export default BePartner;