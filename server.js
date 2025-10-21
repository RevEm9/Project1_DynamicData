import express from 'express';

const app = express();
const PORT = 2000; 

app.get('/', (req, res) => {
    res.send('Hello, WORLD!'); 
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});