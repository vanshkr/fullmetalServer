import mongoose from 'mongoose';
import WatchlistModal from "../models/watchListSchema.js";
import UserModal from "../models/userSchema.js";



export const getLists = async (req,res) => {
    const {id} = req.params;
    try{
       const userAnime = await WatchlistModal.findOne({id:id});
       res.status(200).json(userAnime);
        
    }
    catch(error)
    {
        res.status(404).json({message:error});
    }
 
};
export const removeAnimeFromList = async(req,res)=>{
    const {option,id:animeId} = req.body;
    const {id} = req.params;
    const key = option?.replace(/\s/g, "")?.toLowerCase();
    
    try {
        const existingUserWatch = await WatchlistModal.findOne({id: id});
        if(existingUserWatch)
        {
            const newUserWatch = existingUserWatch[key].filter((id)=> animeId !==id);
            await WatchlistModal.findByIdAndUpdate(existingUserWatch._id, {...newUserWatch}, { new: true });
            res.status(201).json(existingUserWatch);
        }
    }
    catch (error) {
        res.status(409).json({message:error});
    }
}
export const createList = async (req,res)=>{
    
    const {option,id:animeId} = req.body;
    const {id} = req.params;
    const initialState = {
        watching: [],
        plantowatch: [],
        onhold: [],
        completed: [],
        dropped: [],
      };
      const key = option?.replace(/\s/g, "")?.toLowerCase();
    
    try {
        const existingUserWatch = await WatchlistModal.findOne({id: id});
        if(existingUserWatch)
        {
            existingUserWatch[key].push(animeId);
            await WatchlistModal.findByIdAndUpdate(existingUserWatch._id, {...existingUserWatch}, { new: true });
            res.status(201).json(existingUserWatch);
        }
        else
        {
            const newState = {...initialState};
            
            newState[key].push(animeId);
            
            const newUserWatch = new WatchlistModal({...newState,id});
            
            await newUserWatch.save();
            res.status(201).json(newUserWatch);
        }
        
        
    } catch (error) {
        res.status(409).json({message:error});
    }
};