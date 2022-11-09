import React, { useEffect } from "react";
import { db, UseFirebaseValue } from "../Firebase";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  increment,
  setDoc,
  getDoc,
  // getDocs,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const Feed = () => {
  const [{ feeds, user }, dispatch] = UseFirebaseValue();

  const like = async (feed) => {
    const docRefUser = doc(db, "Users", user.email, "Likes", feed.id);
    const docRefMain = doc(db, "Feeds", feed.id);
    const docSnap = await getDoc(docRefUser);
    if (docSnap.exists()) {
      if (docSnap.data().liked === true) {
        await updateDoc(docRefUser, {
          likes: increment(-1),
          liked: false,
        });
        await updateDoc(docRefMain, {
          likes: increment(-1),
          likedBy: arrayRemove(user.email),
        });
      } else {
        await updateDoc(docRefUser, {
          likes: increment(1),
          liked: true,
        });
        await updateDoc(docRefMain, {
          likes: increment(1),
          likedBy: arrayUnion(user.email),
        });
      }
    } else {
      await updateDoc(docRefMain, {
        likes: increment(1),
        likedBy: arrayUnion(user.email),
      });
      const newFeed = {
        ...feed,
        liked: true,
        likes: feed.likes + 1,
      };
      await setDoc(docRefUser, newFeed);
    }
  };

  // async function getLikes() {
  //   const docSnapLike = await getDocs(
  //     collection(db, "Users", user.email, "Likes")
  //   );
  //   docSnapLike.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // }

  useEffect(() => {
    const q = query(collection(db, "Feeds"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      dispatch({
        type: "Feeds fetch",
        feeds: querySnapshot.docs.map((document) => ({
          id: document.id,
          imgUrl: document.data().imgUrl,
          caption: document.data().caption,
          likes: document.data().likes,
          likedBy: document.data().likedBy,
        })),
      });
    });
    // getLikes();
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return feeds.map((feed) => {
    return (
      <div key={feed.id} className="feed">
        <div className="feed-header">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTo8ot81o5G-DZLv5GatY5S5Jsc2rHobmXkQ&usqp=CAU"
            alt="profile"
          />
          <h2>Name</h2>
        </div>
        <img src={feed?.imgUrl} alt="feeds" />
        <div className="feed-footer">
          {feed.likedBy && feed.likedBy.includes(user.email) ? (
            <FavoriteIcon
              sx={{ fontSize: 50, color: "red" }}
              onClick={() => {
                like(feed);
              }}
            />
          ) : (
            <FavoriteBorderIcon
              onClick={() => {
                like(feed);
              }}
              sx={{ fontSize: 50 }}
            />
          )}
          <ModeCommentOutlinedIcon
            sx={{ fontSize: 50, color: "rgba(0, 0, 0, 0.6)" }}
            color="black"
          />
          <SendOutlinedIcon
            sx={{ fontSize: 50, color: "rgba(0, 0, 0, 0.6)" }}
            color="black"
          />
          <BookmarkBorderOutlinedIcon
            sx={{ fontSize: 50 }}
            color="black"
            className="save"
          />
        </div>
        <h4>{feed.likes} Likes</h4>
        <h5>Liked By {feed.likedBy}</h5>
        <div className="feed-last-caption">
          <h3>Profile</h3>
          <h3 className="caption">{feed.caption}</h3>
        </div>
      </div>
    );
  });
};

export default Feed;
