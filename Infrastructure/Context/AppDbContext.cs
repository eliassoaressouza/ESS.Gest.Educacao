using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context;

public partial class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options)
    : base(options)
    {
    }
    public virtual DbSet<Conteudo> Conteudos { get; set; }

    public virtual DbSet<Curso> Cursos { get; set; }

    public virtual DbSet<Matricula> Matriculas { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Conteudo>(entity =>
        {
            entity.HasKey(e => e.IdConteudo);

            entity.ToTable("Conteudo");

            entity.Property(e => e.IdConteudo).ValueGeneratedNever();
            entity.Property(e => e.ConteudoTxt)
                .HasMaxLength(2000)
                .IsUnicode(false)
                .HasColumnName("ConteudoTXT");
            entity.Property(e => e.Titulo)
                .HasMaxLength(250)
                .IsUnicode(false);

            entity.HasOne(d => d.Curso).WithMany(p => p.Conteudos)
                .HasForeignKey(d => d.CursoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Conteudo_Conteudo");
        });

        modelBuilder.Entity<Curso>(entity =>
        {
            entity.HasKey(e => e.IdCurso);

            entity.ToTable("Curso");

            entity.Property(e => e.Descricao)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Nome)
                .HasMaxLength(350)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Matricula>(entity =>
        {
            entity.HasKey(e => e.IdMatricula);

            entity.ToTable("Matricula");

            entity.Property(e => e.IdMatricula).HasColumnName("idMatricula");
            entity.Property(e => e.Data).HasColumnType("datetime");

            entity.HasOne(d => d.IdCursoNavigation).WithMany(p => p.Matriculas)
                .HasForeignKey(d => d.IdCurso)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Matricula_Curso");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Matriculas)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Matricula_Usuario");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario);

            entity.ToTable("Usuario");

            entity.Property(e => e.Email)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Nome)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Senha)
                .HasMaxLength(500)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

}
