"""added new tables

Revision ID: 921f5659aa74
Revises: c6ac343e0437
Create Date: 2023-09-20 13:59:17.357711

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '921f5659aa74'
down_revision = 'c6ac343e0437'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_chat_history',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('conversation_id', sa.Integer(), nullable=True),
    sa.Column('last_message_timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['conversation_id'], ['conversations.id'], name=op.f('fk_user_chat_history_conversation_id_conversations')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_chat_history_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_chat_history')
    # ### end Alembic commands ###
