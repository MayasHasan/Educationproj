using AutoMapper;
using Core.IRepository;
using Core.Paging;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Core.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly AppDbContext _context;
        private readonly DbSet<T> _dbSet;
        public GenericRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }
        public async Task<T> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }
        public async Task<T> GetAsync(Expression<Func<T, bool>> exprssion, List<string> includes = null)
        {
            IQueryable<T> query = _dbSet;
            if (includes != null)
            {
                foreach (var includePropery in includes)
                {
                    query = query.Include(includePropery);
                }
            }
            return await query.FirstOrDefaultAsync(exprssion);
        }


        public async Task<IList<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        //public async Task<IList<T>> GetAllAsync(PagingDetails pagingDetails, Expression<Func<T, bool>> exprssion = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, List<string> includes = null)
        //{
        //    IQueryable<T> query = _dbSet;

        //    if (exprssion != null)
        //    {
        //        query = query.Where(exprssion);
        //    }
        //    if (includes != null)
        //    {
        //        foreach (var includePropery in includes)
        //        {
        //            query = query.Include(includePropery);
        //        }
        //    }
        //    if (orderBy != null)
        //    {
        //        query = orderBy(query);
        //    }
        //    return await query.ToListAsync();
        //}



        public Task<IQueryable<T>> GetAllAsync( Expression<Func<T, bool>> exprssion = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, List<string> includes = null)
        {
            IQueryable<T> query = _dbSet;

            if (exprssion != null)
            {
                query = query.Where(exprssion);
            }
            if (includes != null)
            {
                foreach (var includePropery in includes)
                {
                    query = query.Include(includePropery);
                }
            }
            if (orderBy != null)
            {
                query = orderBy(query);
            }
            return Task.FromResult(query);
        }




        public async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            return entity;
        }


        public async Task<int> CountAsync()
        {
            return await _dbSet.CountAsync();
        }

        public async Task Delete(Guid id)
        {
            var entity = await GetByIdAsync(id);
            if (entity == null)
            {
                throw new ArgumentNullException(" Entities Not Found");
            }
            _dbSet.Remove(entity);
        }

        public void DeleteRange(IList<T> entities)
        {

            _dbSet.RemoveRange(entities);
        }

        public T Update(T entity)
        {

            if (entity == null)
            {
                throw new ArgumentNullException(" Entities Not Found");
            }

            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            return entity;
        }






        //public async Task<IEnumerable<T>> AddRangeASync(IEnumerable<T> entities)
        //{
        //    await _dbSet.AddRangeAsync(entities);
        //    return entities;
        //}
        //public async Task<IEnumerable<T>> GetAllAsync(List<string> includes = null)
        //{
        //    IQueryable<T> query = _dbSet;
        //    if (includes != null)
        //    {
        //        foreach (var includePropery in includes)
        //        {
        //            query = query.Include(includePropery);
        //        }
        //    }    
        //    return await query.ToListAsync();
        //}

    }
}


