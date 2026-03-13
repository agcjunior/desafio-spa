import { ReactNode } from 'react';

interface CardProps {
  title: string | ReactNode;
  className?: string;
  headerAction?: ReactNode;
  children: ReactNode;
}

const Card = ({ title, className = 'card', headerAction, children }: CardProps) => {
  return (
    <section className={className}>
      <div className="card-header">
        <h2>{title}</h2>
        {headerAction}
      </div>
      {children}
    </section>
  );
};

export default Card;
