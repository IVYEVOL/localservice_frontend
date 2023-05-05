import React from "react";
import { createContext } from "react";
import { useState } from "react";



const serviceContext =createContext(
    [
    {
        ID:10,
        name:"werrqa"
    },
    {
        ID:12,
        name:"werrqa"
    },
])


export default serviceContext

