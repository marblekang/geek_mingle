import db from "@/fire-config";
import {
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
  onSnapshot,
  DocumentData,
  where,
} from "@firebase/firestore";

import React, { useEffect, useState } from "react";

const Test = () => {
  const [chatRooms, setChatRooms] = useState([]);

  return <div></div>;
};

export default Test;
