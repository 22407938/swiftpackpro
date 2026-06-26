// app/components/ui/Card.tsx
import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'medium' | 'heavy';
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'light', className = '', ...props }, ref) => {
    const glassClass = {
      light: 'glass',
      medium: 'glass-light',
      heavy: 'glass-heavy',
    }[variant];

    return (
      <div
        ref={ref}
        className={`${glassClass} rounded-2xl p-6 ${className}`}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export default Card;
