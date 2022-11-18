import React, { useState, useEffect }  from "react";
import * as likeService from "../../services/likes-service";
import * as dislikeService from "../../services/dislikes-service";

const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {}}) => {

    /**
     * Use useState and useEffect to change like button and dislike button status.
     */
    const [hasLiked, setHasLike] = useState(null);

    const [hasDisliked, setHasDisliked] = useState(null);

    /**
     * Check if a tuit has been liked by user or not.
     */
    const checkLike = async() => {
      const userLiked = await likeService.userHasLikedTuit("me",tuit._id);
      if (userLiked.length===1) {
        setHasLike(false);
        
      }else{
        setHasLike(true);
        setHasDisliked(false);
      }
    }

    // /**
    //  * Check if a tuit has been disliked by user or not.
    //  */
    const checkDislike = async() => {
      const userDisliked = await dislikeService.userHasDislikedTuit("me",tuit._id);
      if (userDisliked.length===1){
        setHasDisliked(false);
       
      }else{
        setHasDisliked(true);
        setHasLike(false);
      }
    }

    /**
     * The onClick function on like button.
     */
    const clickOnLike = async() => {
      likeTuit(tuit);
      await checkLike();
    }

    //  /**
    //  * The onClick function on dislike button.
    //  */
    const clickOnDislike = async() => {
      dislikeTuit(tuit);
      await checkDislike();
    }

    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats && tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats && tuit.stats.retuits}
        </div>

        {/** like button */  }
        <div className="col">
          <span onClick={() => clickOnLike()}>
              {
                hasLiked ? (
                  <i className="fa-solid fa-thumbs-up"></i>
                ) : (
                  <i className="fa-regular fa-thumbs-up"></i>
                )
              
              }
              
            {tuit.stats && tuit.stats.likes}
            
          </span>
          </div>
          {/** dislike button */}
          <div className="col">
          <span className='dislike-button' onClick={() => clickOnDislike()}>
              {
                hasDisliked ? (
                  <i className="fa-solid fa-thumbs-down"></i>
                ) : (
                  <i className="fa-regular fa-thumbs-down"></i>
                )
              
              }
          <span className="dislike-number">
          {tuit.stats && tuit.stats.dislikes}
          </span>
           
            
          </span>
        </div>

        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;