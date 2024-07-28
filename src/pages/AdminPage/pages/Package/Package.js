import styles from "./Package.module.scss";
import { useEffect, useState } from "react";
import { usePageTitle } from "../../../../contexts/PageTitleContext";
import PackageTable from "./PackageTable/PackageTable";
import Button from "../../../../components/Button/Button";
import { fetchDiscounts } from "../../../../api/discounts";
import { createPackage } from "../../../../api/packages";
import InputCustom from "../../../../components/InputCustom/InputCustom";
import Modal from "../../../../components/Modal/Modal";
import { fetchRates } from "../../../../api/rates";
import SelectCustom from "../../../../components/SelectCustom/SelectCustom";

function Package() {
  const { setPageTitle } = usePageTitle();
  const [packagesData, setPackagesData] = useState([]);
  const [creatingPackage, setCreatingPackage] = useState(false);
  const [newPackage, setNewPackage] = useState({
    name: "",
    discounts: [],
    rateId: "",
  });
  const [newDiscount, setNewDiscount] = useState({ title: "", discount: "" });
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rates, setRates] = useState([]);
  const [selectedRate, setSelectedRate] = useState("");

  useEffect(() => {
    setPageTitle("Forfaits");
  }, [setPageTitle]);

  useEffect(() => {
    const getRates = async () => {
      try {
        const response = await fetchRates();
        setRates(response.data);
      } catch (error) {
        handleError(error, "Erreur lors de la récupération des tarifs.");
      }
    };

    getRates();
  }, []);

  useEffect(() => {
    const getDiscounts = async () => {
      try {
        const response = await fetchDiscounts();
        if (response.status === 200) {
          const data = response.data;

          // Organisation par package
          const organizedData = data.reduce((acc, item) => {
            if (!acc[item.package_id]) {
              acc[item.package_id] = {
                id: item.package_id,
                name: item.forfait,
                rate: item.rate,
                discounts: [],
              };
            }
            acc[item.package_id].discounts.push({
              id: item.id,
              title: item.title,
              discount: item.discount,
            });
            return acc;
          }, {});

          setPackagesData(Object.values(organizedData));
        }
      } catch (error) {
        handleError(error, "Erreur lors de la récupération des remises.");
      }
    };

    getDiscounts();
  }, []);

  const handleCreateNewPackage = () => {
    setCreatingPackage(true);
  };

  const handleSaveDiscount = () => {
    newPackage.discounts = [...newPackage.discounts, newDiscount];
    setShowDiscountModal(false);
    setNewDiscount({ title: "", discount: "" });
  };

  const handleSavePackage = async () => {
    try {
      const rate = rates.find((rate) => rate.name === selectedRate);
      if (!rate) {
        setErrorMessage("Veuillez sélectionner une catégorie valide");
        return;
      }

      if (!newPackage.name.trim()) {
        setErrorMessage("Veuillez entrer un nom pour le forfait");
        return;
      }

      const packageToCreate = { ...newPackage, rateId: rate.id };
      const response = await createPackage(packageToCreate);

      if (response.status === 201) {
        const createdPackage = response.data;
        setPackagesData((prevData) => ({
          ...prevData,
          [newPackage.id]: createdPackage,
        }));

        setCreatingPackage(false);
        setNewPackage({ name: "", discounts: [], rateId: "" });
        setSelectedRate("");
        setErrorMessage("");
      } else {
        setErrorMessage(
          `Erreur lors de la création du forfait : ${response.statusText} `
        );
      }
    } catch (error) {
      console.error("Erreur lors de la création du forfait : ", error);
      setErrorMessage(
        "Une erreur est survenue lors de la création du forfait."
      );
    }
  };

  const handleCancelCreatePackage = () => {
    setCreatingPackage(false);
    setErrorMessage("");
    // logique pour vider les discounts et le package
    setNewPackage({ name: "", discounts: [] });
    setNewDiscount({ title: "", discount: "" });
  };

  const handleCancelCreateDiscount = () => {
    setShowDiscountModal(false);
  };

  const handleError = (error, defaultMessage) => {
    console.error(defaultMessage, error);
    setErrorMessage(error.response?.data?.message || defaultMessage);
  };

  return (
    <div className={styles.container}>
      {creatingPackage ? (
        <div className={styles.creationPackageContainer}>
          <h2>Création d'un forfait</h2>
          <div style={{ marginBottom: "30px" }}>
            <InputCustom
              type="text"
              value={newPackage.name}
              placeholder="Nom du forfait"
              onChange={(e) =>
                setNewPackage({ ...newPackage, name: e.target.value })
              }
            />
          </div>

          <div className={styles.rateContainer}>
            <h3>Catégorie</h3>
            <SelectCustom
              label="Catégorie"
              options={rates}
              valueProp="name"
              labelProp="name"
              minWidth={200}
              initialValue={selectedRate}
              onChange={(e) => setSelectedRate(e.target.value)}
            />
          </div>

          <div className={styles.discountContainer}>
            <h3>Remise(s)</h3>
            {newPackage.discounts.length > 0 &&
              newPackage.discounts.map((discount) => (
                <div key={discount.title}>
                  <p>{discount.title}</p>
                  <p>{discount.discount}</p>
                </div>
              ))}

            <Button
              style={{
                padding: "5px 10px",
                marginLeft: "5px",
                fontSize: "0.8rem",
              }}
              color={"var(--secondary-color)"}
              onClick={() => setShowDiscountModal(true)}
            >
              + Ajouter
            </Button>

            {showDiscountModal && (
              <div className={styles.modalContainer}>
                <Modal
                  isOpen={showDiscountModal}
                  onClose={() => setShowDiscountModal(false)}
                >
                  <h2>Création d'une nouvelle remise</h2>
                  <InputCustom
                    style={{ marginBottom: "10px" }}
                    type="text"
                    value={newDiscount.title}
                    placeholder="Titre de la remise"
                    onChange={(e) =>
                      setNewDiscount({ ...newDiscount, title: e.target.value })
                    }
                  />
                  <InputCustom
                    type="text"
                    value={newDiscount.discount}
                    placeholder="Remise"
                    onChange={(e) =>
                      setNewDiscount({
                        ...newDiscount,
                        discount: e.target.value,
                      })
                    }
                  />

                  <div className={styles.btnContainer}>
                    <Button
                      style={{
                        padding: "7px 15px",
                        marginRight: "5px",
                        fontSize: "0.8rem",
                      }}
                      color={"var(--secondary-color)"}
                      onClick={handleSaveDiscount}
                    >
                      Enregistrer
                    </Button>
                    <Button
                      style={{
                        padding: "7px 15px",
                        marginRight: "5px",
                        fontSize: "0.8rem",
                      }}
                      color={"var(--secondary-color)"}
                      onClick={handleCancelCreateDiscount}
                    >
                      Annuler
                    </Button>
                  </div>
                </Modal>
              </div>
            )}
          </div>

          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}

          <div className={styles.btnContainer}>
            <Button
              buttonStyle={{
                marginRight: "10px",
              }}
              color={"var(--secondary-color)"}
              onClick={handleSavePackage}
            >
              Enregistrer
            </Button>
            <Button
              buttonStyle={{
                marginLeft: "10px",
              }}
              color={"var(--secondary-color)"}
              onClick={handleCancelCreatePackage}
            >
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.packageDisplay}>
          {packagesData ? (
            <div>
              <h2 className={styles.title}>Forfaits</h2>
              <PackageTable
                packagesData={packagesData}
                setPackagesData={setPackagesData}
                rates={rates}
              />
            </div>
          ) : (
            <div>
              <p>Aucun forfait trouvé</p>
            </div>
          )}
          <div className={styles.btnContainer}>
            <Button
              onClick={handleCreateNewPackage}
              color="var(--secondary-color)"
            >
              + Créer un nouveau forfait
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Package;
