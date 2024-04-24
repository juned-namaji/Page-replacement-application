'use client';
import React, { useState } from "react";
import NextPageForm from "./components/createNewPage";
import Pages from "./components/PageComponent";
import CacheCapacityModal from "./components/cacheCapModal";
import Modal from "./components/modal";

const Home = () => {
  const [reload, setReload] = useState(false);
  const [cap, setCap] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [deletedData, setDeletedData] = useState({});

  const newPageAdded = () => {
    reload ? setReload(false) : setReload(true);
  };

  const handleSubmitCapacity = (c) => {
    setCap(c);
    setIsOpen(false);
    console.log(c);
  }
  const pageDeleted = ({ deleted, data }) => {
    if (deleted) {
      setDeleted(deleted);
      setDeletedData(data);
    }
  }
  const handleCloseModal = () => {
    setDeleted(false);
  }

  return (
    <>
      {deleted && (
        <Modal
          data={deletedData}
          onClose={handleCloseModal}
        />
      )}

      {!isOpen ?
        (<main className="flex min-h-screen flex-col items-center">
          <h1 className="text-3xl mb-8 mt-10">Hello, This is the Main Page</h1>
          <div className="grid grid-cols-[3fr,1fr] w-full gap-4">
            <div className="px-4 py-3">
              <Pages reload={reload} />
            </div>
            <div className="fixed top-0 right-20 h-screen flex justify-center items-center">
              <NextPageForm newPageAdded={newPageAdded} cap={cap} pageDeleted={pageDeleted} />
            </div>
          </div>
        </main>) :
        (<div>
          <CacheCapacityModal
            onSubmit={handleSubmitCapacity}
          />
        </div>
        )
      }
    </>
  );
};

export default Home;
