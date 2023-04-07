import React, { useState, useEffect, useRef } from "react";
import styles from "./ParallaxCard.module.css";
import * as Tabs from '@radix-ui/react-tabs';
//import nextjs image
import Image from 'next/image';


export default function ParallaxCard( {list}  ) {
  const [cardTransform, setCardTransform] = useState("");
  const [gradientAngle, setGradientAngle] = useState(45);
  const [shineX, setShineX] = useState(0);
  const [shineY, setShineY] = useState(0);

  const cardRef = useRef(null);

  useEffect(() => {

    const handleMouseMoveCard = (e) => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = (rect.width / 2 - (e.clientX - rect.left)) / -20;
      const y = (rect.height / 2 - (e.clientY - rect.top)) / -20;
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      setCardTransform(`rotateY(${x}deg) rotateX(${y}deg)`);
      setGradientAngle(angle);
      setShineX(e.clientX - rect.left);
      setShineY(e.clientY - rect.top);
    };

    const handleMouseLeaveCard = () => {
      setCardTransform("");
    };

    const cardElement = cardRef.current;
    if (cardElement) {
           cardElement.addEventListener("mousemove", handleMouseMoveCard);
      cardElement.addEventListener("mouseleave", handleMouseLeaveCard);
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener("mousemove", handleMouseMoveCard);
        cardElement.removeEventListener("mouseleave", handleMouseLeaveCard);
      }
    };
  }, []);

 

  const dividerStyle = {
    background: `linear-gradient(90deg, rgba(255, 255, 255, 0.5) ${gradientAngle}%, rgba(255, 255, 255, 0) 100%)`,
  };

  const cardStyle = {
    transform: cardTransform,
    backgroundImage: `radial-gradient(circle at ${shineX}px ${shineY}px, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%)`,
  };

  const beforeElementStyle = {
  background: `linear-gradient(${gradientAngle}deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0.5) 100%)`
};


  return (
    <div className={styles.appContainer}>
      <div ref={cardRef} className={styles.card} style={cardStyle} data-gradientAngle={`--gradient-angle: ${gradientAngle}deg`} >
        
        <div className={styles.cardBefore} style={beforeElementStyle}></div>        
        <Tabs.Root className={styles.TabRoot} defaultValue="tab1">
            <Tabs.List className={styles.TabList} aria-label="Manage your account">
                <Tabs.Trigger className={styles.TabsTrigger} value="tab1">
                   About
                </Tabs.Trigger>
                <Tabs.Trigger className={styles.TabsTrigger} value="tab2">
                    Investments
                </Tabs.Trigger>
                <Tabs.Trigger className={styles.TabsTrigger} value="tab3">
                    Blog
                </Tabs.Trigger>
                
            </Tabs.List>
            
            <Tabs.Content className={styles.TabContent} value="tab1">
            <hr className={styles.divider} style={dividerStyle} />  
                
                <h3 className={styles.cardTitle}>Work</h3>
               

                <div className = {styles.companies}>
                    <div className={styles.companyContainer}>
                        <div className={styles.company}>
                            <Image src="/alchemy.png" alt="Alchemy" className = {styles.companyImage} width={48} height={48} />
                        </div>
                        <div className = {styles.companyText}>
                            <h4 className={styles.cardSubtitle}>Alchemy, June 2021 - Present</h4>
                            <p className = {styles.cardText}>Product Manager & Partner At Alchemy Ventures</p>
                        </div>
                    </div>

                    <div className={styles.companyContainer}>
                        <div className={styles.company}>
                            <Image src="/rstor.jpeg" alt="Rstor" className = {styles.companyImage} width={48} height={48} />
                        </div>
                        <div className = {styles.companyText}>
                            <h4 className={styles.cardSubtitle}>RSTOR, June 2019 - August 2019</h4>
                            <p className = {styles.cardText} >Intern on Decentralized Cloud Storage Team</p>
                        </div>
                    </div>

                    <div className={styles.companyContainer}>
                        <div className={styles.company}>
                            <Image src="/mindpump.png" alt="MindPump" className = {styles.companyImage} width={48} height={48} />
                        </div>
                        <div className = {styles.companyText}>
                            <h4 className={styles.cardSubtitle}>Mind Pump Media, June 2017 - August 2019</h4>
                            <p className = {styles.cardText} >Head of Growth</p>
                        </div>
                    </div>

                </div>

                <h3 className={styles.cardTitle}>Education</h3>
                <div className={styles.companyContainer}>
                        <div className={styles.company}>
                            <Image src="/usc.jpeg" alt="usc" className = {styles.companyImage} width={48} height={48} />
                        </div>
                        <div className = {styles.companyText}>
                            <h4 className={styles.cardSubtitle}>USC, August 2019 - December 2022</h4>
                            <p className = {styles.cardText} >Computer Science & Business</p>
                        </div>
                    </div>
            </Tabs.Content>

            <Tabs.Content className={styles.TabContent} value="tab2">
                <hr className={styles.divider} style={dividerStyle} />

                <h3 className={styles.cardTitle}>Investments</h3>
                <div className={styles.scrollableContainers}>
                    {list.map((item) => (
                        <div key={item.id} className={styles.companyContainer}>
                        <div className={styles.company}>
                            <Image unoptimized src={ "https://s2.googleusercontent.com/s2/favicons?domain_url=" + item.properties.URL.url +"&sz=64" } height={20} width={20} alt="url favicon" />
                            
                            <a className = {styles.title} href = {item.properties.URL.url}>
                                {item.properties.Name.title[0]?.plain_text || ""}
                            </a>
                            
                        </div>
                        </div>
                    ))}
                </div>


            </Tabs.Content>
            


        </Tabs.Root>   
           
      
      </div>
    </div>
  );

}



  

