import express from "express";
import 'dotenv/config';
import cors from "cors";
import axios from "axios";

// create an instance of an express app
const app = express();

app.use(express.json());
app.use(cors());

const router = express.Router();

router.get('/weather', async (req, res) => {
    try {
       const response = await axios.get("https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast/");
       
       return res.status(200).json({ data: response.data.data.items[0].forecasts });

    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch weather forecast"});
    }
});

// entity type indicator
const PQ = [
  "LP", "LL", "FC", "PF", "RF", "MQ", "MM", "NB", "CC", "CS",
  "MB", "FM", "GS", "DP", "CP", "NR", "CM", "CD", "MD", "HS",
  "VH", "CH", "MH", "CL", "XL", "CX", "HC", "RP", "TU", "TC",
  "FB", "FN", "PA", "PB", "SS", "MC", "SM", "GA", "GB",
];

router.post("/verify-uen", (req, res) => {
  const { uen } = req.body;

  const uen_upper = uen.trim().toUpperCase();

  if (!uen_upper) {
    return res.status(400).json({ error: "UEN is empty"});
  }

  // check length of uen
  if (uen_upper.length < 9 || uen_upper.length > 10) {
    return res.status(400).json({ error: "UEN is not of 9 or 10 characters" });
  }

  // check if last character is alphabetic
  if (!(/[A-Z]$/.test(uen_upper))) {
    return res.status(400).json({ error: "Last character is not alphabetic" });
  }

  const uenArr = uen_upper.split("");

  // (A) Businesses registered with ACRA
  if(uen_upper.length === 9) {
   
    for (let i = 0; i < uenArr.length - 1; i ++) {
      if (isNaN(uenArr[i])) {
        return res.status(400).json({ error: "Non-numericals contained within the 1st to 8th character (nnnnnnnnX)" });
      }
    }

    return res.status(200).json({ message: "(A) Valid businesses registered with ACRA"});
  
  } else if (uen_upper.length === 10) {
    
    // (B) Local companies registered with ACRA
    if (!isNaN(uenArr[0]) && !isNaN(uenArr[1]) && !isNaN(uenArr[2]) && !isNaN(uenArr[3])) {
      const parsedYear  = parseInt(uen_upper.slice(0, 4), 10);
      if (!(parsedYear >= 1000 && parsedYear <= 9999)) {
        return res.status(400).json({ error: "(B) Year should be within 1000 and 9999 (yyyynnnnnX)"});
      }
      for (let i = 4; i < uenArr.length - 1; i ++) {
        if (isNaN(uenArr[i])) {
          return res.status(400).json({ error: "(B) Non-numericals contained within the 5th to 9th character (yyyynnnnnX)" });
        }
      }

      return res.status(200).json({ message: "(B) Valid local companies registered with ACRA"});
    } 
    // (C) All other entities which will be issued new UEN
    else {
      if (uenArr[0] !== 'T' && uenArr[0] !== 'S' && uenArr[0] !== 'R') {
        return res.status(400).json({ error: "(C) Invalid 1st character (only T or S or R are valid)"});
      }

      if (isNaN(uenArr[1]) || isNaN(uenArr[2])) {
        return res.status(400).json({ error: "(C) Non-numerical contained in 2nd and 3rd character (TyyPQnnnnX)"});
      }

      const entityType = uenArr[3] + uenArr[4];
      
      if (!PQ.includes(entityType)) {
        return res.status(400).json({ error: "(C) Invalid entity type in 4th and 5th character (TyyPQnnnnX)"});
      }

      for (let i = 5; i < uenArr.length - 1; i ++) {
        if (isNaN(uenArr[i])) {
          return res.status(400).json({ error: "(C) Non-numericals contained within the 6th to 9th character (TyyPQnnnnX)" });
        }
      }

      return res.status(200).json({ message: "(C) Valid entities which will be issued new UEN"});
    }
  }

});
  
app.use('/api', router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started and running on port ${PORT}`);
});