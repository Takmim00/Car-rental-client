
import Banner from '../component/Banner';
import FeaturesSection from '../component/FeaturesSection';
import RecentListing from '../component/RecentListing';
import SpecialOffer from '../component/SpecialOffer';
import WhyChooseUs from '../component/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <RecentListing></RecentListing>
            <FeaturesSection></FeaturesSection>
            <SpecialOffer></SpecialOffer>
        </div>
    );
};

export default Home;