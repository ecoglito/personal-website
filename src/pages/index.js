import Head from 'next/head';
import ParallaxCard from '../components/ParallaxCard';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MorphingText from '../components/MorphingText';
const { Client } = require("@notionhq/client");

export default function Home({list}) {

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Head>
          <title>Enzo Coglit</title>
          <link rel="icon" href="/favicon.png" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Calibre&display=swap" rel="stylesheet"/>

        </Head>
        <div className = {styles.content}>
          <div className = {styles.leftTextBlock}>
            <div className = {styles.introStack}>
              <h4 className={styles.header}>
                Hey! My name is
              </h4>
              <h2 className = {styles.name}>
                Enzo Coglitore
              </h2>
              <div className={styles.morphingTextWrapper}>
              <MorphingText />
              </div>
            </div>
            <p className = {styles.favorites}>
              I thrive on tackling complex challenges, designing user-centered products, and engaging with innovative ideas. 

              <br></br>
              <br></br>
              
  
              I&apos;m passionate about working to create meaningful and lasting impact for humanity.
            </p>
            <div className = {styles.interestsContainer}>
              <p className = {styles.technologies}>
                <span className = {styles.styledP}>Technologies:</span>
                <br></br>
                JavaScript, React, SQL, NextJS, NodeJS, Figma, After Effects, Premiere Pro, Final Cut
              </p>
              <p className = {styles.technologies}>
                <span className = {styles.styledP}>Interests:</span>
                <br></br>
                Artifical Intelligence, Biotechnology, Cryptography
              </p>
            </div>
          </div>
          <div className = {styles.card}>
            <ParallaxCard list = {list}/>
          </div>
        </div>
      </div>
    </div>
  );
}


export async function getStaticProps() {

  const notion = new Client({ auth: process.env.NOTION_API_KEY });


  const response = await notion.databases.query({
      database_id: process.env.NOTION_PORTFOLIOLIST_ID,
      sorts: [
        {
          property: "Created",
          direction: "descending",
        },
      ],
    });

    return {
      props: {
        list: response.results,
      
      },
      revalidate: 5,
    };
  }

