import styles from "./PackageTable.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Fragment, useState } from "react";
import EditPackage from "../EditPackage/EditPackage";
import ModalConfirmation from "../../../../../components/Modal/ModalConfirmation";
import { deletePackage } from "../../../../../api/packages";

function PackageTable({ packagesData, setPackagesData, rates }) {
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [packageIdToDelete, setPackageIdToDelete] = useState(null);
  const [error, setError] = useState("");

  const handleEdit = (packageId) => {
    setEditingPackageId(packageId);
  };

  const handleCancelEdit = () => {
    setEditingPackageId(null);
  };

  const updatePackage = (updatedPackage) => {
    setPackagesData((prevPackagesData) => {
      const packageIndex = prevPackagesData.findIndex(
        (pkg) => pkg.id === updatedPackage.id
      );
      if (packageIndex !== -1) {
        const updatedPackages = [...prevPackagesData];
        updatedPackages[packageIndex] = updatedPackage;

        return updatedPackages;
      }

      return prevPackagesData;
    });
  };

  const handleDelete = async (packageIdToDelete) => {
    try {
      await deletePackage(packageIdToDelete);

      const updatedPackages = packagesData.filter(
        (pkg) => pkg.id !== packageIdToDelete
      );

      setPackagesData(updatedPackages);

      setShowDeleteConfirmationModal(false);
      setEditingPackageId(null);
      setError("");
    } catch (error) {
      console.error("Erreur lors de la suppression du forfait : ", error);
      setError(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la suppression du forfait."
      );
    }
  };

  const handleCloseModal = () => {
    setShowDeleteConfirmationModal(false);
    setError("");
  };

  return (
    <>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Remises</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packagesData &&
            packagesData.map((pkg) => (
              <Fragment key={pkg.id}>
                <tr>
                  <td>{pkg.name}</td>
                  <td>{pkg.rate}</td>
                  <td>
                    {pkg.discounts &&
                      pkg.discounts.map((discount, index) => (
                        <div key={discount.id}>
                          {discount.title}: {discount.discount}
                          {index < pkg.discounts.length - 1 && <br />}
                        </div>
                      ))}
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faPencil}
                      className={styles.icon}
                      onClick={() => handleEdit(pkg.id)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className={styles.icon}
                      onClick={() => {
                        setPackageIdToDelete(pkg.id);
                        setShowDeleteConfirmationModal(true);
                      }}
                    />
                  </td>
                </tr>
                {editingPackageId && editingPackageId === pkg.id && (
                  <tr>
                    <td colSpan="6">
                      <EditPackage
                        packageToEdit={packagesData.find(
                          (pkg) => pkg.id === editingPackageId
                        )}
                        onCancelEdit={handleCancelEdit}
                        rates={rates}
                        updateLocalPackage={updatePackage}
                      />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
        </tbody>
      </table>

      <ModalConfirmation
        isOpen={showDeleteConfirmationModal}
        onClose={handleCloseModal}
        message="Êtes-vous sûr de vouloir supprimer ce forfait ?"
        onConfirm={() => handleDelete(packageIdToDelete)}
      />
    </>
  );
}

export default PackageTable;
