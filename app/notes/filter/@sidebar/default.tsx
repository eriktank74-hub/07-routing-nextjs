import css from "./SidebarNotes.module.css";

const tags = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

const SidebarNotes = async () => {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <a href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </a>
      </li>
      {tags.map((tag) => (
        <li className={css.menuItem} key={tag}>
          <a
            href={`/notes/filter/${tag}`}
            className={css.menuLink}
          >
            {tag}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
