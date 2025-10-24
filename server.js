// import express from 'express';
// import path from 'path';
// import cors from 'cors';
// import fetch from 'node-fetch';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = 2000;
// const API_KEY = "live_CxpHq3jPQAgeAAXiazL6UFInqAhkha8kGstILpRGx0HAch7PwrrIMW2rrekblxOK";

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.static(__dirname));

// // Test route
// app.get('/test', (req, res) => {
//     res.json({ message: 'Server is working' });
// });

// // API endpoint for breeds
// app.get('/api/breeds', async (req, res) => {
//     try {
//         console.log('Fetching breeds...');
//         const response = await fetch('https://api.thedogapi.com/v1/breeds', {
//             headers: {
//                 'x-api-key': API_KEY
//             }
//         });
        
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         console.log('Breeds fetched successfully');
//         res.json(data);
//     } catch (error) {
//         console.error('Server error:', error);
//         res.status(500).json({ error: 'Failed to fetch dog breeds' });
//     }
// });

// app.get('/api/breeds/:id', async (req, res) => {
//     try {
//       const breedId = req.params.id;
//       console.log(`Fetching breed details for ID: ${breedId}`);
  
//       const response = await fetch(
//         `https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}`,
//         { headers: { 'x-api-key': API_KEY } }
//       );
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const data = await response.json();
  
//       if (data.length === 0) {
//         return res.status(404).json({ error: "Breed not found" });
//       }
  
//       // Extract breed info and add the image URL
//       const breed = data[0].breeds[0];
//       breed.image = { url: data[0].url };
  
//       console.log('Breed details fetched successfully');
//       res.json(breed);
  
//     } catch (error) {
//       console.error('Server error:', error);
//       res.status(500).json({ error: 'Failed to fetch breed details' });
//     }
//   });
  
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });
import express from 'express';
import path from 'path';
import cors from 'cors';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 2000;
const API_KEY = "your_api_key_here";

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ✅ Fetch all breeds
app.get('/api/breeds', async (req, res) => {
    try {
        const response = await fetch('https://api.thedogapi.com/v1/breeds', {
            headers: { 'x-api-key': API_KEY }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Failed to fetch dog breeds' });
    }
});

// ✅ Fetch breed details by ID (fixed)
app.get('/api/breeds/:id', async (req, res) => {
    try {
        const breedId = req.params.id;
        const response = await fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${breedId}`, {
            headers: { 'x-api-key': API_KEY }
        });
        const data = await response.json();

        if (data.length === 0 || !data[0].breeds?.length) {
            return res.status(404).json({ error: 'Breed not found' });
        }

        const breedData = data[0].breeds[0];
        const imageUrl = data[0].url;

        res.json({
            ...breedData,
            image: { url: imageUrl }
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Failed to fetch breed details' });
    }
});


// Don't call app.listen()
export default app;
