ALTER TABLE IF EXISTS public.account
    ADD COLUMN IF NOT EXISTS username text COLLATE pg_catalog."default";
ALTER TABLE IF EXISTS public.account
    DROP CONSTRAINT IF EXISTS account_username_check;
ALTER TABLE IF EXISTS public.account
    ADD CONSTRAINT account_username_check CHECK (length(username) < 500);