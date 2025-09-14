import styles from "./Promotion.module.scss";
import { useEffect, useState } from "react";
import { usePageTitle } from "../../../../contexts/PageTitleContext";
import PromotionTable from "./PromotionTable/PromotionTable";
import Button from "../../../../components/Button/Button";
import { useError } from "../../../../contexts/ErrorContext";
import { fetchAllPromotions } from "../../../../app/slices/promotionSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import CreatePromotion from "./CreatePromotion/CreatePromotion";

function Promotion() {
  const { setPageTitle } = usePageTitle();
  const { setErrorMessage } = useError();

  const dispatch = useAppDispatch();
  const {
    items: promotions,
    loading,
    error,
  } = useAppSelector((state) => state.promotions);

  const [creatingPromotion, setCreatingPromotion] = useState(false);

  useEffect(() => {
    setPageTitle("Promotions");
  }, [setPageTitle]);

  useEffect(() => {
    dispatch(fetchAllPromotions());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error, setErrorMessage]);

  const handleCreateNewPromotion = () => {
    setCreatingPromotion(true);
  };

  return (
    <div className={styles.container}>
      {creatingPromotion ? (
        <div className={styles.creationPromotionContainer}>
          <CreatePromotion onClose={() => setCreatingPromotion(false)} />
        </div>
      ) : (
        <div className={styles.promotionDisplay}>
          {loading ? (
            <p>Chargement des promotions ...</p>
          ) : promotions && promotions.length > 0 ? (
            <div>
              <h2 className={styles.title}>Promotions</h2>
              <PromotionTable />
            </div>
          ) : (
            <div>
              <p>Aucune promotion trouvé</p>
            </div>
          )}
          <div className={styles.btnContainer}>
            <Button
              onClick={handleCreateNewPromotion}
              color="var(--secondary-color"
            >
              + Créer une nouvelle promotion
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Promotion;
