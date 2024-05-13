import styles from "./form.module.css";
import SelectTag from "@/component/form/select-tag";
import useSelectTag from "@/component/form/useSelectTag";
interface Props {
  title: string;
  keywords: Array<string>;
}
const Form = ({ title, keywords }: Props) => {
  const { isIncluded, onClickTag, onClickSubmit } = useSelectTag();
  return (
    <>
      <div className={styles["common-container"]}>
        <span className={styles.title}>{title}</span>
        <div className={styles["form-container"]}>
          {keywords.map((keyword) => (
            <SelectTag
              key={keyword}
              isIncluded={isIncluded}
              onClickTag={onClickTag}
              itemName={keyword}
            />
          ))}
        </div>
        <button className={styles["common-button"]} onClick={onClickSubmit}>
          다음
        </button>
      </div>
    </>
  );
};

export default Form;
