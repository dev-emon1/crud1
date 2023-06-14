import { Button, Container, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

function App() {
  const [info, setInfo] = useState({
    fName: "",
    email: "",
    deg: "",
  });
  const [error, setError] = useState("");

  const validation = () => {
    if (!info.fName || !info.email || !info.deg) {
      setError("Please Provide Those Information");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // send data to database
  const db = getDatabase();
  const handleSubmit = () => {
    validation();
    set(push(ref(db, "users")), {
      fName: info.fName,
      email: info.email,
      deg: info.deg,
    });
  };

  // get all data from database
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "users");
    onValue(starCountRef, (snapshot) => {
      console.log(snapshot.val());
    });
  }, []);
  return (
    <>
      <div>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={6} className="form">
              <TextField
                onChange={handleChange}
                type="text"
                id="standard-basic"
                label="Enter Your Name"
                variant="standard"
                margin="normal"
                fullWidth
                name="fName"
              />
              <TextField
                onChange={handleChange}
                type="email"
                id="standard-basic"
                label="Email"
                variant="standard"
                margin="normal"
                fullWidth
                name="email"
              />
              <TextField
                onChange={handleChange}
                type="text"
                id="standard-basic"
                label="Designation"
                variant="standard"
                margin="normal"
                fullWidth
                name="deg"
              />

              <Button
                onClick={handleSubmit}
                variant="contained"
                className="submit-btn"
              >
                Submit
              </Button>
              {error ? (
                <p style={{ marginTop: "15px", color: "red" }}>{error}</p>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default App;
