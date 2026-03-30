import React from 'react';
import { useTheme } from '../../settings/ThemeContext';
import Hero from './Hero';
import ForexMasterBundle from './ForexMasterBundle';
import Award from './Award';
import Review from './Review';
import CTASection from './CTASection';
import AboutTraderNation from './AboutTraderNation';
import Gallery from './Gallery';
import WhyChooseTraderNation from './WhyChooseTraderNation';


const Home = () => {
    const { colors, theme  } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div style={{ backgroundColor: colors.background, color: colors.text }}>
            <Hero />
            <AboutTraderNation />
            <Award />
            <ForexMasterBundle />
            <Gallery />
            
            <Review />
            {/* <CTASection /> */}
            <WhyChooseTraderNation />
        </div>
    );
};

export default Home;
