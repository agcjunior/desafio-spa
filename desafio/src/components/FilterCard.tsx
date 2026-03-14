import Card from "./Card";

interface FilterItem {
  id: string;
  nome: string;
}

interface FilterCardProps {
  title: string;
  items: FilterItem[];
  selectedItemId: string | null;
  onToggle: (id: string) => void;
  addLabel: string;
  loading?: boolean;
  onAdd?: () => void;
}

const FilterCard = ({
  title,
  items,
  selectedItemId,
  onToggle,
  addLabel,
  loading,
  onAdd,
}: FilterCardProps) => {
  return (
    <Card
      title={title}
      headerAction={
        <button className="add-btn" aria-label={addLabel} onClick={onAdd}>
          +
        </button>
      }
    >
      {loading ? (
        <div style={{ padding: "16px", color: "var(--secondary)" }}>
          Carregando...
        </div>
      ) : (
        <ul className="list">
          {items.map((item) => (
            <li
              key={item.id}
              className={`list-item ${selectedItemId === item.id ? "active" : ""}`}
              onClick={() => onToggle(item.id)}
            >
              {item.nome}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default FilterCard;
