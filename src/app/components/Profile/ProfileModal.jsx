import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Badge,
  Image,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import getAwards from "@/app/components/Profile/GetAwards";
import getBio from "@/app/components/Profile/GetBio";
import getFilmography from "@/app/components/Profile/GetAllFilmography";
import ClAwards from "@/app/data/cl_awards.json";
import ClBio from "@/app/data/cl_bio.json";
import CLFilms from "@/app/data/cl_all_filmography.json";
import CustomPagination from "@/app/components/CustomPagination"; // Import CustomPagination component
import "./ProfileModal.css"; // Import CSS file for custom styling

const ProfileModal = ({ handleClose, show, itemId }) => {
  const [awards, setAwards] = useState({});
  const [bio, setBio] = useState({});
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filmsPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let fetchedAwards = {};
        let fetchedBio = {};
        let fetchedFilms = [];

        if (process.env.NODE_ENV === "development") {
          fetchedAwards = ClAwards;
          fetchedBio = ClBio;
          fetchedFilms = CLFilms.filmography;
          console.log("films:", fetchedFilms);
        } else {
          fetchedAwards = await getAwards(itemId);
          fetchedBio = await getBio(itemId);
          fetchedFilms = await getFilmography(itemId);
        }
        setAwards(fetchedAwards);
        setBio(fetchedBio);
        setFilms(fetchedFilms);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchData();
    }
  }, [itemId]);

  const { prestigiousAwardSummary, totalWins, totalNominations } = awards;
  const { awardNomination } = prestigiousAwardSummary || {};
  const { name, birthDate, birthPlace, gender, heightCentimeters, image } = bio;

  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <div className="text-danger">{error}</div>
        ) : (
          <>
            <Row>
              <Col md={4}>
                {image && (
                  <Image
                    src={image.url}
                    alt={name}
                    fluid
                    rounded
                    thumbnail
                    className="mb-3 profile-photo "
                  />
                )}
              </Col>
              <Col md={6}>
                <div>
                  <p>
                    <strong>Birth Date:</strong> {birthDate}
                  </p>
                  <p>
                    <strong>Birth Place:</strong> {birthPlace}
                  </p>
                  <p>
                    <strong>Gender:</strong> {gender}
                  </p>
                  <p>
                    <strong>Height:</strong> {heightCentimeters} cm (
                    {Math.round(heightCentimeters * 0.0328084 * 100) / 100}{" "}
                    feet)
                  </p>
                </div>
                <div>
                  <h5>Prestigious Award Summary</h5>
                  <p>Award Nomination: {awardNomination?.award?.text}</p>
                  <Badge variant="success">{totalWins?.total} Wins</Badge>{" "}
                  <Badge variant="warning">
                    {totalNominations?.total} Nominations
                  </Badge>
                </div>
              </Col>
            </Row>
            <Row>
              {currentFilms.map((film, index) => (
                <Col md={4} key={index}>
                  <div className="film-item mb-3">
                    <Image
                      src={
                        film.image
                          ? film.image.url
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNWoZhTRyuOwc2TBBgSHMzxK1Oj4KQInvuMBCSGeMJCNnGoRaH_RExpbQ5RaMJPxibMjQ&usqp=CAU"
                      }
                      alt={film.title}
                      rounded
                      className="film-image"
                    />
                    <div className="film-overlay">
                      <h5>{film.title}</h5>
                    </div>
                    <div className="film-info">
                      {film.titleType && (
                        <>
                          <strong>Title Type: </strong>
                          {film.titleType}
                          <br />
                        </>
                      )}
                      {film.year && (
                        <>
                          <strong>Year: </strong>
                          {film.year}
                          <br />
                        </>
                      )}
                      {film.category && (
                        <>
                          <strong>Category: </strong>
                          {film.category}
                          <br />
                        </>
                      )}
                      {film.characters && (
                        <>
                          <strong>Characters: </strong>
                          {film.characters.join(", ")}
                          <br />
                        </>
                      )}
                      {film.status && (
                        <>
                          <strong>Status: </strong> {film.status}
                        </>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <CustomPagination
              filmsPerPage={filmsPerPage}
              totalFilms={films.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
