import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Badge,
  Image,
  Row,
  Col,
  ToggleButton,
  ToggleButtonGroup,
  Table,
} from "react-bootstrap";
import getAwards from "@/app/components/Profile/GetAwards";
import getBio from "@/app/components/Profile/GetBio";
import getFilmography from "@/app/components/Profile/GetAllFilmography";
import ClAwards from "@/app/data/cl_awards.json";
import ClBio from "@/app/data/cl_bio.json";
import CLFilms from "@/app/data/cl_all_filmography.json";
import CustomPagination from "@/app/components/CustomPagination";
import {
  ModalBioSkeleton,
  ModalFilmSkeleton,
} from "@/app/components/Skeletons/ModalBodySkeleton";
import Skeleton from "react-loading-skeleton";

import "./ProfileModal.css";

const ProfileModal = ({ handleClose, show, itemId }) => {
  const [awards, setAwards] = useState({});
  const [bio, setBio] = useState({});
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filmsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState("images");
  const [loading, setLoading] = useState(true);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedAwards = {};
        let fetchedBio = {};
        let fetchedFilms = [];

        if (process.env.NODE_ENV === "development") {
          fetchedAwards = ClAwards;
          fetchedBio = ClBio;
          fetchedFilms = CLFilms.filmography;
        } else {
          fetchedAwards = await getAwards(itemId);
          fetchedBio = await getBio(itemId);
          fetchedFilms = await getFilmography(itemId);
        }

        setAwards(fetchedAwards);
        setBio(fetchedBio);
        setFilms(fetchedFilms);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (itemId) {
      fetchData();
    }
  }, [itemId]);

  const { prestigiousAwardSummary, totalWins, totalNominations } = awards;
  const { awardNomination } = prestigiousAwardSummary || {};

  const { name, birthDate, birthPlace, gender, heightCentimeters, image } = bio;

  // Pagination
  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setLoadingNextPage(true);
  };

  const handleViewModeChange = (value) => {
    setViewMode(value);
  };

  useEffect(() => {
    setLoadingNextPage(false);
  }, [currentPage]);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <>{loading ? <Skeleton width={100} /> : <>{name}</>}</>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <>
            <ModalBioSkeleton viewMode={viewMode} />
            <ModalFilmSkeleton viewMode={viewMode} />
          </>
        ) : (
          <>
            <Row>
              <Col xs={12} md={4} className="text-center mb-3">
                <Image
                  src={image?.url || "https://via.placeholder.com/150"}
                  alt={name}
                  rounded
                  className="profile-photo img-fluid"
                />
              </Col>
              <Col xs={12} md={8}>
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
            <Row className="mb-3">
              <Col xs={12} md={8} className="text-center">
                <ToggleButtonGroup
                  type="radio"
                  name="viewMode"
                  value={viewMode}
                  onChange={handleViewModeChange}
                >
                  <ToggleButton
                    id="toggle-1"
                    value="images"
                    variant="outline-primary"
                  >
                    Images
                  </ToggleButton>
                  <ToggleButton
                    id="toggle-2"
                    value="list"
                    variant="outline-secondary"
                  >
                    List
                  </ToggleButton>
                </ToggleButtonGroup>
              </Col>
            </Row>
            {loadingNextPage ? (
              <ModalFilmSkeleton viewMode={viewMode} />
            ) : viewMode === "images" ? (
              <>
                <Row>
                  {currentFilms
                    .sort((a, b) => b.year - a.year)
                    .map((film, index) => (
                      <Col xs={12} sm={6} md={4} key={index}>
                        <div className="film-item mb-3">
                          <Image
                            src={
                              film.image
                                ? film.image.url
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNWoZhTRyuOwc2TBBgSHMzxK1Oj4KQInvuMBCSGeMJCNnGoRaH_RExpbQ5RaMJPxibMjQ&usqp=CAU"
                            }
                            alt={film.title}
                            rounded
                            className="film-image img-fluid"
                          />
                          <div className="film-overlay">
                            <h5>{film.title}</h5>
                          </div>
                          <div className="film-info rounded">
                            <strong>Title Type:</strong> {film.titleType}{" "}
                            {film.year}
                            <br />
                            <strong>Characters:</strong>{" "}
                            {film.characters && film.characters.join(", ")}
                            <br />
                            <strong>Status:</strong> {film.status}
                          </div>
                        </div>
                      </Col>
                    ))}
                </Row>
              </>
            ) : (
              <>
                <Row>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Year</th>
                        <th>Characters</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentFilms
                        .sort((a, b) => b.year - a.year)
                        .map((film, index) => {
                          const filmIndex = indexOfFirstFilm + index + 1; // Calculate the film index
                          return (
                            <tr key={index}>
                              <td>{filmIndex}</td>
                              <td>{film.title}</td>
                              <td>{film.titleType}</td>
                              <td>{film.year}</td>
                              <td>
                                {film.characters && film.characters.join(", ")}
                              </td>
                              <td>{film.status}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </Row>
              </>
            )}
          </>
        )}
        <CustomPagination
          filmsPerPage={filmsPerPage}
          totalFilms={films.length}
          currentPage={currentPage}
          paginate={paginate}
        />
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
