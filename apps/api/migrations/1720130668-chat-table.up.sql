BEGIN;

CREATE TABLE IF NOT EXISTS public.chat_message
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    text text COLLATE pg_catalog."default",
    nonce text COLLATE pg_catalog."default",
    chat_id uuid,
    account_id uuid,
    link text COLLATE pg_catalog."default",
    video_url text[] COLLATE pg_catalog."default",
    photo_url text[] COLLATE pg_catalog."default",
    file_url text[] COLLATE pg_catalog."default",
    reply_to uuid,
    CONSTRAINT chat_message_pkey PRIMARY KEY (id),
    CONSTRAINT public_chat_message_account_id_fkey FOREIGN KEY (account_id)
        REFERENCES public.account (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT public_chat_message_chat_id_fkey FOREIGN KEY (chat_id)
        REFERENCES public.chat (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.chat_message
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.chat_message
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.chat_message TO anon;

GRANT ALL ON TABLE public.chat_message TO authenticated;

GRANT ALL ON TABLE public.chat_message TO postgres;

GRANT ALL ON TABLE public.chat_message TO service_role;

GRANT ALL ON TABLE public.chat_message TO supabase_admin;

CREATE TABLE IF NOT EXISTS public.chat
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    type chat_type_enum,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT channel_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.chat
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.chat
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.chat TO anon;

GRANT ALL ON TABLE public.chat TO authenticated;

GRANT ALL ON TABLE public.chat TO postgres;

GRANT ALL ON TABLE public.chat TO service_role;

GRANT ALL ON TABLE public.chat TO supabase_admin;

CREATE TABLE IF NOT EXISTS public.chat_privates
(
    chat_id uuid NOT NULL,
    account_ids text[] COLLATE pg_catalog."default",
    CONSTRAINT chat_privates_pkey PRIMARY KEY (chat_id),
    CONSTRAINT chat_privates_chat_id_fkey FOREIGN KEY (chat_id)
        REFERENCES public.chat (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.chat_privates
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.chat_privates
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.chat_privates TO anon;

GRANT ALL ON TABLE public.chat_privates TO authenticated;

GRANT ALL ON TABLE public.chat_privates TO postgres;

GRANT ALL ON TABLE public.chat_privates TO service_role;

GRANT ALL ON TABLE public.chat_privates TO supabase_admin;

CREATE TABLE IF NOT EXISTS public.chat_seen_messages
(
    message_id uuid NOT NULL DEFAULT gen_random_uuid(),
    seen_at timestamp with time zone NOT NULL DEFAULT now(),
    account_id uuid NOT NULL DEFAULT gen_random_uuid(),
    chat_id uuid NOT NULL,
    CONSTRAINT chat_seen_messages_pkey PRIMARY KEY (message_id, account_id),
    CONSTRAINT public_chat_seen_messages_account_id_fkey FOREIGN KEY (account_id)
        REFERENCES public.account (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT public_chat_seen_messages_chat_id_fkey FOREIGN KEY (chat_id)
        REFERENCES public.chat (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT public_chat_seen_messages_message_id_fkey FOREIGN KEY (message_id)
        REFERENCES public.chat_message (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.chat_seen_messages
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.chat_seen_messages
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.chat_seen_messages TO anon;

GRANT ALL ON TABLE public.chat_seen_messages TO authenticated;

GRANT ALL ON TABLE public.chat_seen_messages TO postgres;

GRANT ALL ON TABLE public.chat_seen_messages TO service_role;

GRANT ALL ON TABLE public.chat_seen_messages TO supabase_admin;


CREATE TABLE IF NOT EXISTS public.chat_subscription
(
    chat_id uuid NOT NULL,
    requested_at timestamp with time zone,
    account_id uuid NOT NULL,
    joined_at timestamp with time zone,
    public_key text COLLATE pg_catalog."default",
    private_key text COLLATE pg_catalog."default",
    last_seen_at timestamp with time zone,
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    CONSTRAINT chat_subscriptions_pkey PRIMARY KEY (id),
    CONSTRAINT chat_subscriptions_id_key UNIQUE (id),
    CONSTRAINT chat_subscriptions_account_id_fkey FOREIGN KEY (account_id)
        REFERENCES public.account (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT chat_subscriptions_chat_id_fkey FOREIGN KEY (chat_id)
        REFERENCES public.chat (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.chat_subscription
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.chat_subscription
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.chat_subscription TO anon;

GRANT ALL ON TABLE public.chat_subscription TO authenticated;

GRANT ALL ON TABLE public.chat_subscription TO postgres;

GRANT ALL ON TABLE public.chat_subscription TO service_role;

GRANT ALL ON TABLE public.chat_subscription TO supabase_admin;

CREATE TABLE IF NOT EXISTS public.account_presence
(
    account_id uuid NOT NULL DEFAULT gen_random_uuid(),
    last_seen timestamp with time zone NOT NULL DEFAULT now(),
    is_online boolean,
    CONSTRAINT account_presence_pkey PRIMARY KEY (account_id),
    CONSTRAINT public_account_presence_account_id_fkey FOREIGN KEY (account_id)
        REFERENCES public.account (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.account_presence
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.account_presence
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.account_presence TO anon;

GRANT ALL ON TABLE public.account_presence TO authenticated;

GRANT ALL ON TABLE public.account_presence TO postgres;

GRANT ALL ON TABLE public.account_presence TO service_role;

GRANT ALL ON TABLE public.account_presence TO supabase_admin;

END;