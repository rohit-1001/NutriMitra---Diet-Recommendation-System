import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { keyframes } from '@emotion/react';
import illustrationUrl from '../../assets/homepage/illustration1.png';
import communityImageUrl from '../../assets/homepage/illustration2.jpeg';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to right, #4caf50, #81c784)',
  color: 'white',
  padding: '80px 0',
  textAlign: 'center',
  animation: `${fadeIn} 1.5s ease-in-out`,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  textAlign: 'left',
  marginLeft: '2rem',
}));

const PraiseText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  marginBottom: theme.spacing(4),
  textAlign: 'left',
  marginLeft: '2rem',
}));

const ImpactSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  background: '#f5f5f5',
  textAlign: 'center',
  animation: `${fadeIn} 1.5s ease-in-out`,
  paddingBottom: "7rem"
}));

const ActionButton = styled(Button)(({ theme }) => ({
  background: '#4caf50',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '20px',
  '&:hover': {
    background: '#388e3c',
    transform: 'scale(1.05)',
  },
  transition: 'background 0.3s, transform 0.3s',
}));

const ImpactItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  },
}));

const ExpertHome = () => {
  const handleJoinCommunity = () => {
    window.open('https://chat.whatsapp.com/your-group-link', '_blank');
  };

  return (
    <Container
      style={{
        margin: '0px',
        padding: '0px',
        minWidth: '100%',
        maxWidth: '100%',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <HeroSection>
        <img
          src={illustrationUrl}
          alt="Health Tracking Illustration"
          style={{ width: '30%', margin: '0px auto', borderRadius: '0px', height: '100%' }}
        />
        <div
          style={{
            margin: '3rem 6rem 3rem 3rem',
            padding: '2rem',
          }}
        >
          <WelcomeText>Welcome, Health Heroes!</WelcomeText>
          <PraiseText>
            Your dedication and expertise play a vital role in shaping healthier lives.
          </PraiseText>
          <PraiseText>
            You are the guiding light that empowers individuals to make informed dietary choices.
          </PraiseText>
          <ActionButton variant="contained" onClick={handleJoinCommunity}>
            Join Our Community
          </ActionButton>
        </div>
      </HeroSection>
      <ImpactSection>
        <Typography variant="h4" gutterBottom marginTop style={{
          marginTop: "3rem"
        }}>
          Your Impact on Health
        </Typography>
        <Typography variant="body1" paragraph style={{
          fontSize: '1.2rem',
          width: '50%',
          margin: '0 auto',
          padding: '1em',
        }}>
          Every piece of advice you give and every meal plan you create can change lives.
          You help people lead healthier, happier lives through your knowledge and compassion.
        </Typography>
        <Grid container spacing={4} justifyContent="center" style={{
          width: "80%",
          margin: "0 auto"
        }}>
          <Grid item xs={12} sm={4}>
            <ImpactItem>
              <Typography variant="h6">Nutrition Awareness</Typography>
              <Typography>
                Educating clients about nutritional choices enhances their quality of life.
              </Typography>
            </ImpactItem>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ImpactItem>
              <Typography variant="h6">Personalized Guidance</Typography>
              <Typography>
                Tailoring dietary plans ensures that each individual receives the support they need.
              </Typography>
            </ImpactItem>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ImpactItem>
              <Typography variant="h6">Building Communities</Typography>
              <Typography>
                Fostering a sense of community among clients encourages healthier habits.
              </Typography>
            </ImpactItem>
          </Grid>
        </Grid>
      </ImpactSection>
    </Container>
  );
};

export default ExpertHome;
