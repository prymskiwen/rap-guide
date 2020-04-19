import React, { useEffect, useState } from 'react'
import { StyledContent, Heading, FourGrid, MediumSpace } from '../../styles/PageStyles'
import VideoThumb from '../Guide/VideoThumb'
import { getLocalStorage } from '../../utilities/LocalStorage'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import TagCloud from '../Guide/TagCloud'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const Home = () => {

  /* Queries */
  const { loading, data: guides } = useQuery(GET_ALL_GUIDES);
  const { loading: topics_loading, data: topicses } = useQuery(GET_TOPICS, {
    variables: {
      max: 10
    }
  });

  /* Functions */
  function selectTag(tag) {
    console.log(tag);
  }

  if (loading || topics_loading) return null
  return (
    <StyledContent>
      <Heading>
        <h1>Explore</h1>
        <Search>
          <input type="text" placeholder="What are you looking for?..." />
          <button><FontAwesomeIcon icon={faSearch} /></button>
        </Search>
      </Heading>

      <TagCloud selectTag={selectTag} tags={topicses.topicses} />

      <MediumSpace>
        <h1>Rap Guides</h1>
      </MediumSpace>

      <FourGrid>
        {guides.guides.map(guide => {
          return (<VideoThumb
            key={guide.id}
            id={guide.id}
            title={guide.videoTitle}
            thumbnail={guide.videoThumb}
            topics={guide.topicses} />)
        })}
      </FourGrid>
    </StyledContent>
  )
}

export default Home;

const Search = styled.div`
  padding-right: 4rem;
  display: flex;
  align-items: center;
  margin: 1rem 0 2.5rem 0;

  input[type=text] {
    width: 100%;
    padding: 1rem 2rem;
    height: 5rem;
    border-right: none;
    border-top: 1px solid #999;
    border-left: 1px solid #999;
    border-bottom: 1px solid #999;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    font-size: 1.6rem;
    outline: none;
  }

  button {
    background-color: #333;
    color: white;
    height: 5rem;
    cursor: pointer;
    padding: 1rem 2rem;
    border-left: none;
    border-top: 1px solid #333;
    border-right: 1px solid #333;
    border-bottom: 1px solid #333;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    transition: all .3s ease;
    outline: none;
    font-size: 1.8rem;

    &:hover {
      background-color: #999;
      border-color: #999;
    }
  }
`

const GET_TOPICS = gql`
  query getTopics($max: Int!) {
    topicses(first:$max){
      id
      topic
      lessons {
        id
      }
    }
  }
`

const GET_ALL_GUIDES = gql`
  query getGuides {
    guides {
      id
      videoId
      videoUrl
      videoTitle
      videoThumb
      topicses {
        id
        topic
      }
    }
  }
`