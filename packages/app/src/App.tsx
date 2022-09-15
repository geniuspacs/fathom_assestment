import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Joke } from '@joke_geniuspacs/lib'

function App() {
  const [joke, setJoke] = useState<Joke | undefined>();
  const [revealed, setRevealed] = useState<boolean>(false);
  const [isLoadingJoke, setIsLoadingJoke] = useState<boolean>(false);
  const [isLoadingPunchline, setIsLoadingPunchline] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    findNewJoke();
  }, []);

  const findNewJoke = (): void => {
    setIsLoadingJoke(true);
    const randomId = Math.floor(Math.random() * (410 - 0) + 0);
    setTimeout(() => {
      fetch(
        `${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/jokes/${randomId}`,
        {
          method: 'POST'
        }
      )
      .then(
        (response) => {
          if(response.ok) {
            return response.json();
          } else {
            setError(response.statusText);
          }
        },
        () => {
          setError('Oops! We have an error! Please reload and try again in few minutes 😢');
        }
      )
      .then(
        (joke: Joke) => {
          setJoke(joke);
          setIsLoadingJoke(false);
        },
        () => {
          setError('Oops! We have an error! Please reload and try again in few minutes 😢');
        }
      )
      .catch(() => {
        setError('Oops! We have an error! Please reload and try again in few minutes 😢');
      });
    }, 3000);
  }

  const newJoke = (e: any) => {
    setRevealed(false);
    e.preventDefault();
    findNewJoke();
  }

  const revealPunchline = (e: any) => {
    e.preventDefault();
    setIsLoadingPunchline(true);
    setTimeout(() => {
      setRevealed(true);
      setIsLoadingPunchline(false);
    }, 3000);
  }

  return (
    <Container className="App text-center">

      {!error && isLoadingJoke && 
        <Spinner animation="border" variant="primary" className='my-4' />
      }

      {
        !error && !isLoadingJoke &&
        <>
          {
            joke && 
            <Col className='my-4'>
              <Card className='py-4 bg-light'>
                <Card.Title>
                  {joke.setup}
                </Card.Title>
                {revealed && <Card.Subtitle>
                  {joke.punchline}
                </Card.Subtitle>}
              </Card>
            </Col>
          }

          <Row className='d-flex justify-content-between align-items-center'>
            <Col className='d-flex justify-content-center'>
              <Button disabled={joke && !revealed} variant="primary" onClick={newJoke}>Next joke!</Button>
            </Col>

            {
              joke && !revealed &&
              <Col className='d-flex justify-content-center'>
                  <Button variant='danger' onClick={revealPunchline} disabled={isLoadingPunchline}>
                    {
                      isLoadingPunchline &&
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    }
                    Reveal the punchline!
                  </Button>
              </Col>
            }
          </Row>
        </>
      }

      {
        error && 
        <Alert className='my-4' key="danger" variant="danger">
          {error}
        </Alert>
      }
      
    </Container>
  )
}

export default App
