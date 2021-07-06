import { Grid } from '@material-ui/core';

import Container from "@material-ui/core/Container";
import AULogo from "../img/aulogo.png"

function home(props) {

    const topCSS = {

        justifyContent : "center",
        alignItems: "stretch"
      
    }


    

    console.log(props);

    return (

        <Container maxWidth="xl" color="#4833C4">

        <Grid container direction="column" justify="center" alignItems="center">

            <Grid item xs={10} justify="center" >

            <p>
            
            Velkommen til Aarhus Univesity Campus Herning: https://ingenioer.au.dk/en/student-guidance/find-your-campus/au-campus-herning/
            
            På siden her finder i analyse værktøj til jeres Particle Boards i arbejder med i grupperne og de Particles der kommer til at sidde i GoKartsne
            
        </p>        

            </Grid>

            <Grid item xs={10} >

                <img src={AULogo} alt="AU Logo"></img>

            </Grid>
    

        </Grid>
      </Container>
            
    );

}

export default home;